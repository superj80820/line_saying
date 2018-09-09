import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import re
import requests
import json

option = webdriver.FirefoxOptions()
option.add_argument("--headless")
driver = webdriver.Firefox(firefox_options=option)
driver.get('https://awwapp.com')
print('go web')
element = driver.find_element_by_xpath('//*[@id="start-drawing-widget"]/div/div[2]/div[1]/a')
element.click()
print('click start')
element = driver.find_element_by_xpath('//*[@id="collaborate-button"]')
element.click()
print('click share')

while True:
    html_res = driver.page_source
    print('search invite id')
    print(str(re.search('%2Fb%2F.+%2F',html_res)))
    if re.search('%2Fb%2F.+%2F',html_res):
        aww_link = re.search('%2Fb%2F.+%2F',html_res).group(0)
        aww_link = aww_link[7:16]
        break
    time.sleep(1)
    
driver.quit()
print(aww_link)
