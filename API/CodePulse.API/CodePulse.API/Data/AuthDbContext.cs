using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        //modified after trying to fetch items jwt error
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "3ce26498-9b37-4952-8ca0-599a71c096da";
            var writerRoleId = "afcecc63-e0cb-4eff-b88f-e93461952b8c";

            //Create Reader and Writer Role

            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId

                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId

                },
            };

            // Seed the roles

            builder.Entity<IdentityRole>().HasData(roles);


            // Create an admin user
            var adminUserId = "ec09d3ef-e580-4890-92ff-07a7d7d156e2";
            var admin = new IdentityUser()
            {

                Id = adminUserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>()
                .HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give roles to admin

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new(){
                    UserId=adminUserId,
                    RoleId=readerRoleId
                },
                 new(){
                    UserId=adminUserId,
                    RoleId=writerRoleId
                }
            };


            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
