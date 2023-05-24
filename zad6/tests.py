import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

class XKomTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome() 
        self.driver.maximize_window()

    def accept_cookies(self):
        cookie_accept_button = self.driver.find_element(By.CSS_SELECTOR , '.sc-1p1bjrl-9')
        cookie_accept_button.send_keys(Keys.RETURN)

    def test_home_page_loads(self):
        self.driver.get('https://www.x-kom.pl/')

        self.accept_cookies()

        self.assertIn('Sklep komputerowy', self.driver.title)

    def test_search_functionality(self):
        self.driver.get('https://www.x-kom.pl/')
        self.accept_cookies()

        search_box = self.driver.find_element(By.XPATH ,'//*[@id="app"]/div[1]/header/div[1]/div[3]/div[1]/div/div[1]/div/div[1]/input')
        search_box.send_keys('plecak')
        search_box.send_keys(Keys.RETURN)
        time.sleep(2)

        self.assertIn('Wyniki wyszukiwania - x-kom', self.driver.title)


    def test_login_functionality(self):
        self.driver.get('https://www.x-kom.pl/logowanie')
        username = self.driver.find_element(By.NAME, 'login')
        password = self.driver.find_element(By.NAME, 'password')
        username.send_keys('testuser')
        password.send_keys('testpassword')
        password.send_keys(Keys.RETURN)
        self.assertIn('Logowanie', self.driver.title)

    def test_add_to_cart(self):
        self.driver.get('https://www.x-kom.pl/p/684903-monitor-led-27-xiaomi-mi-2k-gaming-monitor-27eu.html')
        time.sleep(2)
        self.accept_cookies()
        time.sleep(2)
        add_to_cart_button = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/div[1]/div[3]/div[2]/div[3]/div[2]/div/div[2]/div[2]/div/button')
        add_to_cart_button.click()
        time.sleep(2)
        self.driver.get('https://www.x-kom.pl/koszyk')
        time.sleep(2)
        self.assertIn('Xiaomi Mi 2K Gaming Monitor 27EU', self.driver.page_source)

    def test_remove_from_cart(self):
        self.driver.get('https://www.x-kom.pl/p/684903-monitor-led-27-xiaomi-mi-2k-gaming-monitor-27eu.html')

        time.sleep(2)
        self.accept_cookies()
        time.sleep(2)
        add_to_cart_button = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/div[1]/div[3]/div[2]/div[3]/div[2]/div/div[2]/div[2]/div/button')
        add_to_cart_button.click()
        time.sleep(2)
        self.driver.get('https://www.x-kom.pl/koszyk')
        time.sleep(2)
        remove_button = self.driver.find_element(By.CSS_SELECTOR, '#app > div.sc-14ybyi4-0.iToDFs.sc-17bkz68-0.eqeJOo > div.sc-1s1zksu-0.sc-1s1zksu-1.hHQkLn > div.sc-1s1zksu-0.dsazka > div.sc-3ml6w8-0.hxgMhc > ul > li > div > div.sc-160wg4d-3.fDzmSH.sc-bxnmbv-1.bZJYVT > div > div.sc-160wg4d-4.bGPwYC > button.sc-15ih3hi-0.sc-160wg4d-7.blstQy > span > svg')
        remove_button.click()
        time.sleep(2)
        ul_list = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div[1]/div[1]/div[2]/ul/li')

        self.assertNotIn('Xiaomi Mi 2K Gaming Monitor 27EU', ul_list)


    def test_product_details(self):
        self.driver.get('https://www.x-kom.pl/p/684903-monitor-led-27-xiaomi-mi-2k-gaming-monitor-27eu.html')

        self.accept_cookies()
        time.sleep(2)

        self.assertIn('Specyfikacja', self.driver.page_source)

    def test_product_reviews(self):
        self.driver.get('https://www.x-kom.pl/p/684903-monitor-led-27-xiaomi-mi-2k-gaming-monitor-27eu.html#Opinie')

        self.accept_cookies()
        time.sleep(2)

        self.assertIn('Opinie', self.driver.page_source)

    def test_navigation_menu(self):
        self.driver.get('https://www.x-kom.pl')
        menu = self.driver.find_element(By.CSS_SELECTOR, '.sc-1ktmy3g-1')

        self.accept_cookies()
        time.sleep(2)

        self.assertTrue(menu.is_displayed())

    def test_footer_links(self):
        self.driver.get('https://www.x-kom.pl')
        footer = self.driver.find_element(By.XPATH, '/html/body/div[1]/footer')

        self.accept_cookies()
        time.sleep(2)

        self.assertTrue(footer.is_displayed())

    def test_customer_service_link(self):
        self.driver.get('https://www.x-kom.pl')
        customer_service_link = self.driver.find_element(By.LINK_TEXT, 'Smartfony i smartwatche')

        self.accept_cookies()
        time.sleep(2)
        customer_service_link.click()
        time.sleep(2)
        
        self.assertIn('Smartfony i smartwatche', self.driver.title)

    def test_search_no_results(self):
        self.driver.get('https://www.x-kom.pl')
        search_box = self.driver.find_element(By.XPATH ,'//*[@id="app"]/div[1]/header/div[1]/div[3]/div[1]/div/div[1]/div/div[1]/input')
        
        self.accept_cookies()
        time.sleep(2)
        search_box.send_keys('sadasdsad')
        search_box.send_keys(Keys.RETURN)
        time.sleep(2)

        self.assertIn('Przepraszamy, nie znaleźliśmy wyników dla frazy', self.driver.page_source)

    def test_product_listing(self):
        self.driver.get('https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html')

        self.accept_cookies()
        time.sleep(2)
        products = []
        for i in range(3):
            products.append(self.driver.find_element(By.XPATH, f'//*[@id="app"]/div[1]/header/div[2]/div/div/div/nav/ul/li[2]/section/div/div[1]/div[2]/ul/li[{i+1}]'))
        time.sleep(2)

        self.assertTrue(len(products) > 0)


    def test_login_fail(self):
        self.driver.get('https://www.x-kom.pl/logowanie')
        username = self.driver.find_element(By.NAME, 'login')
        password = self.driver.find_element(By.NAME, 'password')

        username.send_keys('testuser')
        password.send_keys('testpassword')
        password.send_keys(Keys.RETURN)
        time.sleep(2)

        self.assertIn('Sprawdź, czy adres e-mail i hasło są poprawne', self.driver.page_source)



    def test_password_reset_functionality(self):
        self.driver.get('https://www.x-kom.pl/przypomnienie-hasla')
        email = self.driver.find_element(By.NAME, 'email')

        email.send_keys('test123')
        email.send_keys(Keys.RETURN)
        time.sleep(2)

        self.assertIn('Adres e-mail jest niepoprawny. Adres musi mieć jeden znak @.', self.driver.page_source)

    def test_button_load_new_products(self):
        self.driver.get('https://www.x-kom.pl')
        button = self.driver.find_element(By.CSS_SELECTOR, '.sc-2zpi9n-0 > div:nth-child(1) > button:nth-child(3)')
        
        self.accept_cookies()
        time.sleep(2)
        button.click()
        time.sleep(2)

        self.assertIn('Jaki laptop kupić? Wybieramy laptopa do domu', self.driver.page_source)

    def test_link(self):
        self.driver.get('https://www.x-kom.pl')
        
        self.accept_cookies()
        time.sleep(2)
        link = self.driver.find_element(By.CSS_SELECTOR, '.sc-2zpi9n-0 > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)')
        link.click()

        self.assertEqual(self.driver.current_url, 'https://www.x-kom.pl/poradniki/7845-jak-dopasowac-procesor-do-karty-graficznej.html')

    def test_hot_shot(self):
        self.driver.get('https://www.x-kom.pl')
        
        self.accept_cookies()
        time.sleep(2)

        self.assertIn('Gorący strzał', self.driver.page_source)

    def test_menu_list_len(self):
        self.driver.get('https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html')

        self.accept_cookies()
        time.sleep(2)
        list_items = self.driver.find_elements(By.XPATH, '//*[@id="app"]/div[1]/header/div[2]/div/div/div/nav/ul/li[2]/section/div/div[1]/div[2]/ul/li')
        time.sleep(2)

        self.assertEqual(len(list_items), 12)

    def test_products_prices(self):
        self.driver.get('https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html')
        self.accept_cookies()
        time.sleep(2)
        price1 = self.driver.find_element(By.XPATH, '//*[@id="listing-container"]/div[1]/div/div[2]/div[3]/div/div[2]/div/span[2]').text
        price2 = self.driver.find_element(By.XPATH, '//*[@id="listing-container"]/div[2]/div/div[2]/div[3]/div/div[2]/div/span').text
        time.sleep(2)

        self.assertTrue(price1 <= price2)


    def test_checkout_page_loads_without_logging(self):
        self.driver.get('https://www.x-kom.pl/p/684903-monitor-led-27-xiaomi-mi-2k-gaming-monitor-27eu.html')
        time.sleep(2)
        self.accept_cookies()
        time.sleep(2)
        add_to_cart_button = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/div[1]/div[3]/div[2]/div[3]/div[2]/div/div[2]/div[2]/div/button')
        add_to_cart_button.click()
        time.sleep(2)
        self.driver.get('https://www.x-kom.pl/koszyk')
        time.sleep(2)
        checkout_button = self.driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div[3]/button')
        checkout_button.click()
        time.sleep(2)

        self.assertIn('Rejestracja', self.driver.title)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
