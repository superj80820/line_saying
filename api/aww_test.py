import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import re
import requests
import json

# option = webdriver.ChromeOptions()
# option.add_argument("headless")
driver = webdriver.Chrome()
driver.implicitly_wait(10) # seconds
driver.get('https://awwapp.com')
element = driver.find_element_by_xpath('//*[@id="start-drawing-widget"]/div/div[2]/div[1]/a')
element.click()
element = driver.find_element_by_xpath('//*[@id="collaborate-button"]')
element.click()
# element = driver.find_element_by_xpath('//*[@id="share-board-widget"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[1]/h5')
# element.click()
html_res = driver.page_source
# print(html_res)

while True:
    html_res = driver.page_source
    print('進入')
    print(str(re.search('%2Fb%2F.+%2F',html_res)))
    if re.search('%2Fb%2F.+%2F',html_res):
        aww_link = re.search('%2Fb%2F.+%2F',html_res).group(0)
        aww_link = aww_link[7:16]
        break
    time.sleep(1)

print(aww_link)
# print(re.search('https://awwapp.com/b/.+/','https://awwapp.com/b/uvhwiix1c/').group(0))

# element.send_keys("superj80820@hotmail.com")
# element = driver.find_element_by_xpath('//*[@id="user_password"]')
# element.send_keys("me0985698738")
# element = driver.find_element_by_xpath('//*[@id="login_from_loginpage"]/span[1]')
# element.click()
# element = driver.find_element_by_xpath('//*[@id="main-nav"]/nav/section/ul[1]/li[1]/a')
# element.click()
# element = driver.find_element_by_xpath('//*[@id="js_upload"]/div[2]/input[7]')
# element.send_keys('C:\\Users\\user\\Desktop\\GitHub\\line_saying\\api\\test.ppt')
# html_res = driver.page_source
# des_id = re.search('slideshow_description_pre_slideshow_\d+',html_res).group(0)
# cate_id = re.search('slideshow_category_pre_slideshow_\d+',html_res).group(0)
# element = driver.find_element_by_id(des_id)
# element.send_keys('test')
# select = Select(driver.find_element_by_id(cate_id))
# select.select_by_value("27")
# while True:
#     html_res = driver.page_source
#     print('進入')
#     print(str(re.search('"publish button small radius"',html_res)))
#     if re.search('"publish button small radius"',html_res):
#         publish_id = re.search('form_pre_slideshow_\d+',html_res).group(0)
#         break
#     time.sleep(1)
# element = driver.find_element_by_xpath('//*[@id="%s"]/div/form/div/div[3]/button[1]'%(publish_id))
# element.click()
# element = driver.find_element_by_xpath('//*[@id="main-panel"]/div[2]/div[2]/div[1]/div[1]/h1')

# slide_link = driver.current_url

# res = requests.get('http://www.slideshare.net/api/oembed/2?url=%s&format=json'%(slide_link))
# res = json.loads(res.text)
# slide_key = res['html']
# slide_key = re.search('key/\w{14}',slide_key).group(0)
# slide_key = slide_key[4:len(slide_key)]

# print(slide_key)