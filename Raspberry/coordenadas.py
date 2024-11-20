import requests
import datetime
import json

url = "http://ip-api.com/json/"
response = requests.get(url)
data = response.json()

lat = data.get('lat')
lon = data.get('lon')

subscription_key = '5AACoZ9sAU84zu07PVFu0ChAp8z1qn2vHS5Ys4ziI7yWaAfXgHBPJQQJ99AKACYeBjFV5MNiAAAgAZMP3Q8N'
url = f"https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query={lat},{lon}&duration=10&subscription-key={subscription_key}"
response = requests.get(url)
forecast_data = []

if response.status_code == 200:
    data = response.json()
    for i, forecast in enumerate(data['forecasts']):
        if i >= 7:  
            break
        date = datetime.datetime.fromisoformat(forecast['date']).date().strftime('%Y-%m-%d')
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
    current_time = datetime.datetime.now()
    for forecast in data['forecasts']:
        forecast_time = datetime.datetime.fromisoformat(forecast['date'])
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