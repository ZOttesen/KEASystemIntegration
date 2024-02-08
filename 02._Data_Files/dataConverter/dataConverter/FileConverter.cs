using System.Text;
using System.Xml.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
namespace dataConverter;

public class FileConverter
{
    public FileConverter()
    {
    }
    
    public void csvConverter(string fileName)
    {
        string file = "C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".csv";
        string[] keys = File.ReadLines(file).First().Split(',');
        string[] values = File.ReadLines(file).Skip(1).First().Split(',');
        Dictionary<string, object> data = new Dictionary<string, object>();
        int keyIndex = 0; 
        StringBuilder combinedValue = new StringBuilder();
        bool insideQuotes = false;
        for (int i = 0; i < values.Length && keyIndex < keys.Length; i++) {
            string currentValue = values[i];
            if (insideQuotes) {
                combinedValue.Append(',');
            }
    
            if (currentValue.StartsWith("\"") && !insideQuotes) {
                insideQuotes = true;
                currentValue = currentValue.Substring(1); 
            }
            if (currentValue.EndsWith("\"") && insideQuotes) {
                insideQuotes = false;
                currentValue = currentValue.Substring(0, currentValue.Length - 1); 
            }
    
            combinedValue.Append(currentValue);
    
            if (!insideQuotes) {
                // If not inside quotes, we've reached the end of the current value.
                string finalValue = combinedValue.ToString();
                combinedValue.Clear();
        
                // Check if the value contains commas indicating it should be a list.
                if (finalValue.Contains(',')) {
                    data[keys[keyIndex]] = finalValue.Split(',').Select(v => v.Trim()).ToList();
                } else {
                    data[keys[keyIndex]] = finalValue;
                }
                keyIndex++; // Move to the next key.
            }
        }
        writeToConsole(data);
    }

    public void jsonConverter(string fileName)
    {
        StreamReader sr = new StreamReader("C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".json");
        string json = sr.ReadToEnd();
        sr.Close();
        
        Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, Object>>(json);

        writeToConsole(data);
    }

    public void xmlConverter(string fileName)
    {
        string file = "C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".xml";
        string xmlContent = File.ReadAllText(file);
        
        XDocument doc = XDocument.Parse(xmlContent);
        var data = new Dictionary<string, object>();
        XElement root = doc.Root;

        foreach (XElement element in root.Elements())
        {
            if (element.HasElements)
            {
                List<string> list = element.Elements().Select(x => x.Value).ToList();
                data.Add(element.Name.LocalName, list);
            }
            else
            {
                data.Add(element.Name.LocalName, element.Value);
            }
        }
        
        writeToConsole(data);
    }

    public void yamlConverter(string fileName)
    {
        string file = "C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".yaml";
        string yamlContent = File.ReadAllText(file);
        
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance) 
            .Build();

        var data = deserializer.Deserialize<Dictionary<string, object>>(yamlContent);

        foreach (var key in data.Keys.ToList())
        {
            if (data[key] is List<object> objectList)
            {
                // Convert each object in the list to its string representation
                List<string> stringList = objectList.ConvertAll(obj => obj.ToString());
        
                // Update the dictionary with the new list of strings
                data[key] = stringList;
            }
        }
        writeToConsole(data);
    }

    private void writeToConsole(Dictionary<string, object> data)
    {
        foreach (var entry in data)
        {
            Console.Write($"{entry.Key}: ");
            if (entry.Value is JArray array)
            {
                foreach (var item in array)
                {
                    Console.Write($"{item}\n\t");
                }

                Console.WriteLine();
            }
            else if (entry.Value is List<string> list)
            {
                foreach (var item in list)
                {
                    Console.Write($"{item}\n\t");
                }

                Console.WriteLine();
            }
            else
            {
                Console.WriteLine(entry.Value);
            }
        }
    }
}