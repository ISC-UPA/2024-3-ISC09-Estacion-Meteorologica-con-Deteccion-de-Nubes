import dht11
import RPi.GPIO as GPIO
import time
import requests

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
pin = 23
GPIO.setup(pin, GPIO.IN)

sensor = dht11.DHT11(pin=pin)
url = "http://192.168.137.1:3000/api/graphql"
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
    if result.is_valid():
        print(f'Temperatura: {result.temperature} °C')
        print(f'Humedad: {result.humidity} %')

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
                "atmospheric_pressure": 0,
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
    else:
        print('Error al leer el sensor')
    time.sleep(1)  # Espera 1 segundo antes de la siguiente lectura

GPIO.cleanup()
