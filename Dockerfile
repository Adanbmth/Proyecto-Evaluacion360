FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["eval360/Eval360/Eval360.csproj", "eval360/Eval360/"]
RUN dotnet restore "eval360/Eval360/Eval360.csproj"
COPY . .
WORKDIR "/src/eval360/Eval360"
RUN dotnet build "Eval360.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Eval360.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Eval360.dll