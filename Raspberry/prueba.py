import smbus
import time

# Dirección del BMP280 (puede ser 0x76 o 0x77 dependiendo de la configuración del sensor)
BMP280_I2C_ADDRESS = 0x77  # Cambiar a 0x77 si tu sensor está configurado para esa dirección

# Registros del sensor BMP280
BMP280_REGISTER_PRESSURE = 0xF7
BMP280_REGISTER_CONTROL = 0xF4

# Inicializar el bus I2C (en Raspberry Pi, generalmente es el bus 1)
bus = smbus.SMBus(1)

# Configurar el sensor BMP280 para leer presión y temperatura
def setup_bmp280():
    # Establecer el modo de lectura normal (medir presión y temperatura)
    bus.write_byte_data(BMP280_I2C_ADDRESS, BMP280_REGISTER_CONTROL, 0x3F)  # 0x3F: 101111 (modo normal, sin modo sleep)

# Función para leer la presión del sensor BMP280
def get_pressure():
    try:
        # Leer 3 bytes de datos de presión
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

# Ejemplo de cómo usar la función para obtener la presión
if __name__ == "__main__":
    while True:
        pressure = get_pressure()
        if pressure is not None:
            print(f"Presión: {pressure:.2f} hPa")
        else:
            print("No se pudo obtener la presión.")
        
        time.sleep(1)
