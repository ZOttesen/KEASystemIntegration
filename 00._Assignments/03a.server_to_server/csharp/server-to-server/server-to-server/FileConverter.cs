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
        
        string projectDirectory = @"C:\Users\ZackO\Desktop\KEA\SystemIntegration\KEASystemIntegration\00._Assignments\01a._FileConverter\dataConverter\dataConverter\files\";
        string file = Path.Combine(projectDirectory, $"{fileName}.csv");
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
        string projectDirectory = @"C:\Users\ZackO\Desktop\KEA\SystemIntegration\KEASystemIntegration\00._Assignments\01a._FileConverter\dataConverter\dataConverter\files\";
        string path = Path.Combine(projectDirectory, $"{fileName}.json");
        string json = File.ReadAllText(path);
    
        Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, Object>>(json);
    
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }

    public string xmlConverter(string fileName)
    {
        string projectDirectory = @"C:\Users\ZackO\Desktop\KEA\SystemIntegration\KEASystemIntegration\00._Assignments\01a._FileConverter\dataConverter\dataConverter\files\";
        string xmlContent = Path.Combine(projectDirectory, $"{fileName}.xml");
        
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
        string projectDirectory = @"C:\Users\ZackO\Desktop\KEA\SystemIntegration\KEASystemIntegration\00._Assignments\01a._FileConverter\dataConverter\dataConverter\files\";
        string file = Path.Combine(projectDirectory, $"{fileName}.yaml");
        
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance) 
            .Build();

        var data = deserializer.Deserialize<Dictionary<string, object>>(file);

        if (data["hobbies"] is List<object> hobbiesObjectList)
        {
            List<string> hobbiesStringList = hobbiesObjectList.ConvertAll(obj => obj.ToString());
            data["hobbies"] = hobbiesStringList; 
        }
        return JsonConvert.SerializeObject(data, Formatting.Indented);
    }
}