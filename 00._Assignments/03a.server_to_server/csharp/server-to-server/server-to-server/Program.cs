using server_to_server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapGet("/json", () =>
    {
        FileConverter fc = new FileConverter();
        string result = fc.jsonConverter("me");
        return Results.Content(result, "application/json");

    })
    .WithName("jsonFile")
    .WithOpenApi();

app.MapGet("/csv", () =>
    {
        FileConverter fc = new FileConverter();
        string result = fc.csvConverter("me");
        return Results.Content(result, "application/json");

    })
    .WithName("csvFile")
    .WithOpenApi();

app.MapGet("/xml", () =>
    {
        FileConverter fc = new FileConverter();
        string result = fc.xmlConverter("me");
        return Results.Content(result, "application/json");

    })
    .WithName("xmlFile")
    .WithOpenApi();

app.MapGet("/yaml", () =>
    {
        FileConverter fc = new FileConverter();
        string result = fc.yamlConverter("me");
        return Results.Content(result, "application/json");
    })
    .WithName("yamlFile")
    .WithOpenApi();

app.MapGet("/nodeJson", async (IHttpClientFactory clientFactory) =>
    {
        var client = clientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:8080/json");
        var content = await response.Content.ReadAsStringAsync();
        return Results.Content(content, "application/json");
    })
    .WithName("nodeJson")
    .WithOpenApi();

app.MapGet("/nodeXML", async (IHttpClientFactory clientFactory) =>
    {
        var client = clientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:8080/XML");
        var content = await response.Content.ReadAsStringAsync();
        return Results.Content(content, "application/json");
    })
    .WithName("nodeXML")
    .WithOpenApi();


app.MapGet("/nodeCSV", async (IHttpClientFactory clientFactory) =>
    {
        var client = clientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:8080/csv");
        var content = await response.Content.ReadAsStringAsync();
        return Results.Content(content, "application/json");
    })
    .WithName("nodeCSV")
    .WithOpenApi();


app.MapGet("/nodeYaml", async (IHttpClientFactory clientFactory) =>
    {
        var client = clientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:8080/yaml");
        var content = await response.Content.ReadAsStringAsync();
        return Results.Content(content, "application/json");
    })
    .WithName("nodeYaml")
    .WithOpenApi();


app.Run();