import os
import yaml
from azure.storage.blob import ContainerClient, ContentSettings
from mimetypes import MimeTypes

def load_config():
    dir_root = os.path.dirname(os.path.abspath(__file__))
    with open(dir_root + "/config.yaml", "r") as yamlfile:
        return yaml.load(yamlfile, Loader=yaml.FullLoader)

def get_files(dir):
    with os.scandir(dir) as entries:
        for entry in entries:
            if entry.is_file() and not entry.name.startswith('.'):
                yield entry

def upload(files, connection_string, container_name):
    container_client = ContainerClient.from_connection_string(connection_string, container_name)
    print("Uploading files to blob storage")
    uploaded_urls = []  # Lista para guardar las URLs de las imágenes subidas

    mime = MimeTypes()  # Instancia de MimeTypes para obtener el Content-Type

    for file in files:
        # Obtener el tipo MIME del archivo
        content_type, _ = mime.guess_type(file.name)
        if not content_type:
            content_type = 'application/octet-stream'  # Si no se puede adivinar el tipo MIME, usa este valor por defecto.

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

# Llamada a la función
config = load_config()
pictures = get_files(config["source_folder"])
uploaded_urls = upload(pictures, config["azure_storage_connectionstring"], config["pictures_container_name"])
