FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Eval360/Eval360.csproj", "Eval360/"]
RUN dotnet restore "Eval360/Eval360.csproj"
COPY . .
WORKDIR "/src/Eval360"
RUN dotnet build "Eval360.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Eval360.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Eval360.dll"]