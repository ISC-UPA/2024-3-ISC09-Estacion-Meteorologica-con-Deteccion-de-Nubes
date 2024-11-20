import os
import yaml
from picamera2 import Picamera2
from azure.storage.blob import ContainerClient, ContentSettings
from mimetypes import MimeTypes
from datetime import datetime
import requests

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
    url = "https://cloudy-api-1-anesf7faa3fdg0fh.mexicocentral-01.azurewebsites.net/api/graphql"
    
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
    
    if backend_response:
        print("Respuesta del backend:", backend_response)
else:
    print("No se pudo capturar la foto.")
