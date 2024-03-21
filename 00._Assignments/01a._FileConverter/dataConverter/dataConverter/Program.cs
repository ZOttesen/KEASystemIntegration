

using System.Text.Json.Nodes;
using dataConverter;

try
{
    FileConverter fileConverter = new FileConverter();
    
    Console.WriteLine("JSON:");
    fileConverter.jsonConverter("me");
    Console.WriteLine("CSV:");
    fileConverter.csvConverter("me");
    Console.WriteLine("XML");
    fileConverter.xmlConverter("me");
    Console.WriteLine("YAML:");
    fileConverter.yamlConverter("me");
}
catch(Exception e)
{
    Console.WriteLine("Exception: " + e.Message);
}
finally
{
    Console.WriteLine("Executing finally block.");
}

