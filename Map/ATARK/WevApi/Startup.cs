using System.Text;
using System.Text.Json.Serialization;
using Application.Interfaces;
using Application.Providers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence;
using Swashbuckle.AspNetCore.Filters;

namespace WebApi
{
    public class Startup
    {
        private string _secureKey = "a very very very important secure key";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy",
                    builder =>
                    {
                        builder
                        .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:1433" })
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });


            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddPersistence(Configuration);
            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddScoped<IIntervalProvider, IntervalProvider>();
            services.AddScoped<IPeriodProvider, PeriodProvider>();
            services.AddScoped<IRoadProvider, RoadProvider>();
            services.AddScoped<ITimetableProvider, TimetableProvider>();
            services.AddScoped<ITransportProvider, TransportProvider>();
            services.AddScoped<ITripProvider, TripProvider>();
            services.AddScoped<TokenProvider>();
            services.AddScoped<IClientProvider, ClientProvider>();
            services.AddScoped<ILineProvider, LineProvider>();
            services.AddScoped<IStationProvider, StationProvider>();
            services.AddScoped<IInitialProvider, InitialProvider>();
            services.AddScoped<IPriceProvider, PriceProvider>();
            services.AddScoped<IStationLines, StationLineProvider>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors("CORSPolicy");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ATRK");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
