import dht11
import RPi.GPIO as GPIO
import time
import requests
import smbus
import time

BMP280_I2C_ADDRESS = 0x77  
BMP280_REGISTER_PRESSURE = 0xF7
BMP280_REGISTER_CONTROL = 0xF4

bus = smbus.SMBus(1)

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
url = "https://cloudy-api-1-anesf7faa3fdg0fh.mexicocentral-01.azurewebsites.net/api/graphql"
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
            print("Response content:", response.text)
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
