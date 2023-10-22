from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search_and_send_data():
    try:
        data = request.get_json()
        keyword = data.get('keyword')
        
        # Step 1: Initialize a Selenium WebDriver (make sure you have a compatible driver installed, e.g., chromedriver)
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")  # Run in headless mode (no visible browser window)
        driver = webdriver.Chrome(options=options)

        # Step 2: Perform a Google search
        search_url = f'https://www.google.com/shopping?q={keyword}'

        driver.get(search_url)

        # Step 3: Extract product details using Selenium
        wait = WebDriverWait(driver, 1)  # Defining the wait variable with a 5-second timeout

        # Product Name
        product_name_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'SGmlof')))
        product_name = product_name_element.text

        # Product Price
        product_price_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'Lhpu7d')))
        product_price = product_price_element.text

        # Product img url
        product_img_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'Ws3Esf')))
        product_img_url = product_img_element.get_attribute('src')
        
        # Step 4: Return the data as a JSON response
        product_info = {
            'name': product_name,
            'image_url': product_img_url,
            'price': product_price,
        }

        # Step 5: Close the Selenium WebDriver
        driver.quit()

        return jsonify({'message': 'Success', 'product_info': product_info})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
