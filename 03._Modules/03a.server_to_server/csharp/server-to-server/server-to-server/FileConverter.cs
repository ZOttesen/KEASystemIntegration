using System.Xml.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
namespace server_to_server;

public class FileConverter
{
    public FileConverter()
    {
    }
    
    public string csvConverter(string fileName)
    {
        string file = "C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".csv";
        string[] keys = File.ReadLines(file).First().Split(',');
        string[] values = File.ReadLines(file).Skip(1).First().Split(',');
        Dictionary<string, object> data = new Dictionary<string, object>();
        int keyIndex = 0; 
        for (int i = 0; i < values.Length && keyIndex < keys.Length;)
        {
            if (values[i].StartsWith("\""))
            {
                string combinedValues = values[i++].TrimStart('"');
                while (i < values.Length && !values[i].EndsWith("\""))
                {
                    combinedValues += "," + values[i++];
                }
                if (i < values.Length)
                {
                    combinedValues += "," + values[i].TrimEnd('"');
                }
                List<string> valueList = combinedValues.Split(',').Select(v => v.Trim()).ToList();
                data.Add(keys[keyIndex], valueList);
                i++; 
            }
            else
            {
                data.Add(keys[keyIndex], values[i++]);
            }
            keyIndex++;
        }
        
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }

    public string jsonConverter(string fileName)
    {
        StreamReader sr = new StreamReader("C:\\Users\\ZackO\\OneDrive\\Desktop\\KEA\\SystemIntegration\\KEASystemIntegration\\02a._Server\\fileConverterServer\\fileConverterServerCSharp\\files\\" + fileName + ".json");
        string json = sr.ReadToEnd();
        sr.Close();
        
        Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, Object>>(json);
        
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }

    public string xmlConverter(string fileName)
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
        
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }

    public string yamlConverter(string fileName)
    {
        string file = "C:\\Users\\ZackO\\RiderProjects\\dataConverter\\dataConverter\\files\\" + fileName + ".yaml";
        string yamlContent = File.ReadAllText(file);
        
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance) 
            .Build();

        var data = deserializer.Deserialize<Dictionary<string, object>>(yamlContent);

        if (data["hobbies"] is List<object> hobbiesObjectList)
        {
            List<string> hobbiesStringList = hobbiesObjectList.ConvertAll(obj => obj.ToString());
            data["hobbies"] = hobbiesStringList; 
        }
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }
}