import dht11
import RPi.GPIO as GPIO
import time
import requests
import smbus
import time
import os
import yaml
from picamera2 import Picamera2
from azure.storage.blob import ContainerClient, ContentSettings
from mimetypes import MimeTypes
from datetime import datetime
import json

BMP280_I2C_ADDRESS = 0x77  
BMP280_REGISTER_PRESSURE = 0xF7
BMP280_REGISTER_CONTROL = 0xF4

bus = smbus.SMBus(1)

def load_config():
    dir_root = os.path.dirname(os.path.abspath(__file__))
    with open(dir_root + "/config.yaml", "r") as yamlfile:
        return yaml.load(yamlfile, Loader=yaml.FullLoader)

def capture_photo():
    picam2 = Picamera2()
    picam2.start()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")  # Genera una marca de tiempo única
    photo_filename = f"captured_photo_{timestamp}.jpg"  # Asigna un nombre único a la foto
    
    picam2.capture_file(photo_filename)
    
    picam2.stop()
    
    return photo_filename

def upload(file_path, connection_string, container_name):
    container_client = ContainerClient.from_connection_string(connection_string, container_name)
    mime = MimeTypes()
    content_type, _ = mime.guess_type(file_path)
    if not content_type:
        content_type = 'application/octet-stream'

    blob_client = container_client.get_blob_client(file_path)
    with open(file_path, "rb") as data:
        content_settings = ContentSettings(content_type=content_type)
        blob_client.upload_blob(data, overwrite=True, content_settings=content_settings)
    
    file_url = blob_client.url
    return file_url

def create_photo_sky_in_backend(photo_url, longitude, latitude, user_id):
    url = "https://cloudy-api-g7hffacvecfwaxac.mexicocentral-01.azurewebsites.net/api/graphql"
    
    mutation = """
    mutation Mutation($data: PhotoSkyCreateInput!) {
        createPhotoSky(data: $data) {
            url_photo
            longitude
            latitude
            user_id {
                id
            }
        }
    }
    """
    
    variables = {
        "data": {
            "url_photo": photo_url,
            "longitude": longitude,
            "latitude": latitude,
            "user_id": {
                    "connect": [
                        {
                            "id": user_id
                        }
                    ]
                },
        }
    }
    
    headers = {
        "Content-Type": "application/json",
    }
    
    response = requests.post(url, json={"query": mutation, "variables": variables}, headers=headers)
    
    if response.status_code == 200:
        print("Foto creada correctamente en el backend")
        return response.json()

    else:
        print(f"Error al crear la foto en el backend: {response.status_code}")
        print(response.text)
        return None

def get_photo_sky_id_by_url(photo_url):
    url = "https://cloudy-api-g7hffacvecfwaxac.mexicocentral-01.azurewebsites.net/api/graphql"  # URL de tu servidor GraphQL
    
    query = """
    query Query($where: PhotoSkyWhereInput!) {
        photoSkies(where: $where) {
            id
        }
    }
    """
    
    variables = {
        "where": {
            "url_photo": {
                "equals": photo_url  
            }
        }
    }
    
    headers = {
        "Content-Type": "application/json",
    }
    
    response = requests.post(url, json={"query": query, "variables": variables}, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        
        if data.get('data', {}).get('photoSkies', []):
            return data['data']['photoSkies'][0]['id']
        else:
            print("No se encontró ninguna foto con esa URL.")
            return None
    else:
        print(f"Error al hacer la consulta GraphQL: {response.status_code}")
        print(response.text)
        return None

def create_api_predicion(prediction_per_day, prediction_per_hour, skyphoto_id):
    url = "https://cloudy-api-g7hffacvecfwaxac.mexicocentral-01.azurewebsites.net/api/graphql"  # URL de tu servidor GraphQL
    
    mutation = """
    mutation Mutation($data: APIPredicionCreateInput!) {
        createAPIPredicion(data: $data) {
            prediction_per_day
            prediction_per_hour
            skyphoto_id {
                id
            }
        }
    }
    """
    
    variables = {
        "data": {
            "prediction_per_day": prediction_per_day,  
            "prediction_per_hour": prediction_per_hour,
            "skyphoto_id": {
                "connect": {
                    "id": skyphoto_id
                }
            }
        }
    }
    headers = {
        "Content-Type": "application/json",
    }
    
    response = requests.post(url, json={"query": mutation, "variables": variables}, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        
        if data.get('data', {}).get('createAPIPredicion'):
            prediction = data['data']['createAPIPredicion']
            print("Predicción creada correctamente:")
            print(f"Predicción por día: {prediction['prediction_per_day']}")
            print(f"Predicción por hora: {prediction['prediction_per_hour']}")
            print(f"ID de la foto asociada: {prediction['skyphoto_id']['id']}")
            return prediction
        else:
            print("No se pudo crear la predicción.")
            return None
    else:
        print(f"Error al hacer la mutación GraphQL: {response.status_code}")
        print(response.text)
        return None


config = load_config()
captured_photo = capture_photo()

if captured_photo:
    uploaded_url = upload(captured_photo, config["azure_storage_connectionstring"], config["pictures_container_name"])
    print(f"Foto subida a Azure: {uploaded_url}")
    
    # Realizar la solicitud GET a la API gratuita ip-api
    url = "http://ip-api.com/json/"
    response = requests.get(url)
    data = response.json()

    # Extraer latitud y longitud
    lat = data.get('lat')
    lon = data.get('lon')

    if lat and lon:
        print(f"{lat}, {lon}")
    else:
        print("No se pudo obtener la ubicación.")

    longitude = lon 
    latitude = lat 
    user_id = "cm33xcdqd0000eqld4n5stau3"  
    
    backend_response = create_photo_sky_in_backend(uploaded_url, longitude, latitude, user_id)
    photo_id = get_photo_sky_id_by_url(uploaded_url)
    

    if backend_response:
        print("Respuesta del backend:", backend_response)

        subscription_key = '5AACoZ9sAU84zu07PVFu0ChAp8z1qn2vHS5Ys4ziI7yWaAfXgHBPJQQJ99AKACYeBjFV5MNiAAAgAZMP3Q8N'
        url = f"https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query={lat},{lon}&duration=10&subscription-key={subscription_key}"
        response = requests.get(url)
        forecast_data = []

        if response.status_code == 200:
            data = response.json()
            for i, forecast in enumerate(data['forecasts']):
                if i >= 7:  
                    break
                date = datetime.fromisoformat(forecast['date']).date().strftime('%Y-%m-%d')
                min_temp = forecast['temperature']['minimum']['value']
                max_temp = forecast['temperature']['maximum']['value']
                
                forecast_data.append({
                    "Fecha": date,
                    "Temperatura Minima": f"{min_temp}",
                    "Temperatura Maxima": f"{max_temp}"
                })
            forecast_json = json.dumps(forecast_data, indent=4)
            print(forecast_json)
            
        else:
            print(f"Error al obtener los datos: {response.status_code}")
            print(response.json())
            
        # Mostrar el pronóstico de las próximas horas
        duration = 24
        url = f"https://atlas.microsoft.com/weather/forecast/hourly/json?api-version=1.1&query={lat},{lon}&duration={duration}&subscription-key={subscription_key}"
        response = requests.get(url)
        hourly_data = []
        if response.status_code == 200:
            data = response.json()
            current_time = datetime.now()
            for forecast in data['forecasts']:
                forecast_time = datetime.fromisoformat(forecast['date'])
                if forecast_time.date() == current_time.date() and forecast_time.hour >= current_time.hour:
                    temperature = forecast['temperature']['value']
                    unit = forecast['temperature']['unit']
                    hourly_data.append({
                        "Fecha y Hora": forecast_time.strftime("%Y-%m-%d %H:%M:%S"),
                        "Temperatura": f"{temperature}"
                    })
                elif forecast_time.date() == current_time.date() and forecast_time.hour == 0:
                    break  
            hourly_data_json = json.dumps(hourly_data, indent=4)
            print(hourly_data_json)
        else:
            print(f"Error al obtener los datos: {response.status_code}")
            print(response.json())
        new_prediction = create_api_predicion(forecast_json, hourly_data_json, photo_id)
        if new_prediction:
            print("Nuevo registro de predicción creado exitosamente.")
        else:
            print("Hubo un problema al crear la predicción.")
else:
    print("No se pudo capturar la foto.")


def setup_bmp280():
    bus.write_byte_data(BMP280_I2C_ADDRESS, BMP280_REGISTER_CONTROL, 0x3F)  # 0x3F: 101111 (modo normal, sin modo sleep)

def get_pressure():
    try:
        data = bus.read_i2c_block_data(BMP280_I2C_ADDRESS, BMP280_REGISTER_PRESSURE, 3)
        
        # Convertir los datos a presión en hPa (hectopascales)
        raw_press = (data[0] << 12) | (data[1] << 4) | (data[2] >> 4)
        pressure = raw_press / 16.0  # Calibración básica (dependiendo del modelo)
        return pressure
    except Exception as e:
        print("Error leyendo el sensor BMP280:", e)
        return None

# Configurar el BMP280
setup_bmp280()

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
pin = 23
GPIO.setup(pin, GPIO.IN)

sensor = dht11.DHT11(pin=pin)
url = "https://cloudy-api-g7hffacvecfwaxac.mexicocentral-01.azurewebsites.net/api/graphql"
headers = {
    "Content-Type": "application/json"
}

query = """
mutation CreateWeatheReading($data: WeatheReadingCreateInput!) {
  createWeatheReading(data: $data) {
    temperature
    atmospheric_pressure
    humidity
    user_id {
      id
    }
  }
}
"""

while True:
    result = sensor.read()
    pressure = get_pressure()
    if result.is_valid():
        print(f'Temperatura: {result.temperature} °C')
        print(f'Humedad: {result.humidity} %')
        print("Presión: {:.2f} hPa".format(pressure))
        
        variables = {
            "data": {
                "user_id": {
                    "connect": [
                        {
                            "id": "cm33xcdqd0000eqld4n5stau3"
                        }
                    ]
                },
                "temperature": result.temperature,
                "atmospheric_pressure": pressure,
                "humidity": result.humidity,
            }
        }

        try:
            response = requests.post(url, headers=headers, json={"query": query, "variables": variables})
            response.raise_for_status()
            print("Response status code:", response.status_code)
            if response.text:
                data = response.json()
                print("Response JSON:", data)
            else:
                print("No content in response")
        except requests.exceptions.HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except requests.exceptions.RequestException as err:
            print(f'Error occurred: {err}')
        except ValueError as json_err:
            print(f'Error decoding JSON: {json_err}')
        break  # Salir del bucle después de una lectura válida
    # else:
        # print('Error al leer el sensor')
    time.sleep(1)  # Espera 1 segundo antes de la siguiente lectura

GPIO.cleanup()
