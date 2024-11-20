import os
import yaml
from azure.storage.blob import ContainerClient, ContentSettings
from mimetypes import MimeTypes
import requests

# Configuración para Azure Custom Vision
custom_vision_url = "https://cloudsmodel-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/a9db23d0-d06c-4cd6-ab47-1df0a3fe70e0/classify/iterations/Iteration1/url"
prediction_key = "EJJHrw4ILkz5X22cjxrdsyMRfDCXQJygBG4Uw6ArvxGvDb78zCOnJQQJ99AKACYeBjFXJ3w3AAAIACOGDb2A"

# 1. Función para cargar la configuración desde config.yaml
def load_config():
    dir_root = os.path.dirname(os.path.abspath(__file__))
    with open(dir_root + "/config.yaml", "r") as yamlfile:
        return yaml.load(yamlfile, Loader=yaml.FullLoader)

# 2. Obtener archivos de un directorio
def get_files(dir):
    with os.scandir(dir) as entries:
        for entry in entries:
            if entry.is_file() and not entry.name.startswith('.'):
                yield entry

# 3. Subir archivos a Azure Blob Storage
def upload(files, connection_string, container_name):
    container_client = ContainerClient.from_connection_string(connection_string, container_name)
    print("Uploading files to blob storage")
    uploaded_urls = []  # Lista para guardar las URLs de las imágenes subidas

    mime = MimeTypes()  # Instancia de MimeTypes para obtener el Content-Type

    for file in files:
        # Obtener el tipo MIME del archivo
        content_type, _ = mime.guess_type(file.name)
        if not content_type:
            content_type = 'application/octet-stream'  # Valor por defecto si no se encuentra el tipo MIME

        blob_client = container_client.get_blob_client(file.name)
        with open(file.path, "rb") as data:
            # Crear un objeto ContentSettings y pasar el content_type
            content_settings = ContentSettings(content_type=content_type)
            # Subir el archivo especificando el Content-Type con ContentSettings
            blob_client.upload_blob(data, overwrite=True, content_settings=content_settings)
        
        file_url = blob_client.url  # Obtener la URL del blob subido
        uploaded_urls.append(file_url)  # Guardar la URL en la lista
        print(f"{file.name} uploaded to blob storage. URL: {file_url}")
    
    return uploaded_urls  # Devolver la lista de URLs

# 4. Función para realizar predicción desde una URL y calcular la probabilidad de lluvia
def predict_image_from_url(image_url):
    try:
        # Headers para la solicitud
        headers = {
            "Prediction-Key": prediction_key,
            "Content-Type": "application/json"
        }

        # Payload con la URL de la imagen
        payload = {"Url": image_url}

        # Solicitud POST al endpoint de Custom Vision
        response = requests.post(custom_vision_url, headers=headers, json=payload)

        # Verificar y procesar la respuesta
        if response.status_code == 200:
            results = response.json()

            # Buscar la etiqueta con mayor probabilidad
            highest_prediction = max(results['predictions'], key=lambda x: x['probability'])
            nube = highest_prediction['tagName']
            probabilidad = highest_prediction['probability'] * 100

            # Asignar probabilidad de lluvia basada en el tipo de nube
            probabilidad_lluvia = calcular_probabilidad_lluvia(nube)

            print(f"Tipo de nube: {nube}")
            print(f"Probabilidad de lluvia: {probabilidad_lluvia}%")
        else:
            print(f"Error {response.status_code}: {response.text}")

    except Exception as e:
        print(f"Error realizando la predicción: {e}")


# 5. Función para calcular la probabilidad de lluvia según el tipo de nube
def calcular_probabilidad_lluvia(nube):
    probabilidades_lluvia = {
        "Cumulonimbus": 80,  # Alta probabilidad de lluvia
        "Cumulos": 30,
        "Cirros": 5,
        "Nimbostratos": 70,
        "Cirrocumulos": 10,
        "Estratos": 20,
        "Estratocumulos": 25,
        "Altostratos": 50,
        "Cirrostratos": 15,
        "Altocumulos": 35
    }

    # Obtener probabilidad basada en el tipo de nube, default 0 si no existe
    return probabilidades_lluvia.get(nube, 0)


# 6. Flujo principal (modificado)
if __name__ == "__main__":
    # Cargar configuración
    config = load_config()
    
    # Obtener los archivos de la carpeta fuente
    pictures = get_files(config["source_folder"] + "test")
    
    # Subir archivos y obtener sus URLs
    uploaded_urls = upload(pictures, config["azure_storage_connectionstring"], config["pictures_container_name"])
    
    # Realizar predicciones para cada URL subida
    for url in uploaded_urls:
        predict_image_from_url(url)

