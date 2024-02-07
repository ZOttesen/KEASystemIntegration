import json
import csv
import yaml
import xml.etree.ElementTree as ET


def read_yaml_file(filePath):
    with open(filePath, 'r') as file:
        print("YAML:")
        data = yaml.safe_load(file)
        print(data)

def read_csv_file(filePath):
    with open(filePath, 'r') as file:
        print("CSV:")
        csv_reader = csv.reader(file)
        for row in csv_reader:
            print(row)

def read_json_file(filePath):
    with open(filePath, 'r') as file:
        print("JSON: ")
        json_content = json.load(file)
        print(json_content)

def read_xml_file(filePath):
    print("XML: ")
    tree = ET.parse(filePath)
    root = tree.getroot()
    for elem in root.iter():
        if elem.text and elem.text.strip():
            print(elem.text.strip())

if __name__ == '__main__':
    read_json_file('./files/me.json')
    read_csv_file('./files/me.csv')
    read_yaml_file('./files/me.yaml')
    read_xml_file('./files/me.xml')

