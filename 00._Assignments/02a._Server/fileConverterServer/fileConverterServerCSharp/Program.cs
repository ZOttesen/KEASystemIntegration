using dataConverter;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Run();
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
    .WithName("jamlFile")
    .WithOpenApi();

