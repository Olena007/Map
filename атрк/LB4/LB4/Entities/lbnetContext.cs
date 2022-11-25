using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using LB4.Models;

namespace LB4.Entities
{
    public partial class lbnetContext : DbContext
    {
        public lbnetContext()
        {
        }

        public lbnetContext(DbContextOptions<lbnetContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Basket> Baskets { get; set; } = null!;
        public virtual DbSet<Characteristic> Characteristics { get; set; } = null!;
        public virtual DbSet<History> Histories { get; set; } = null!;
        public virtual DbSet<Producer> Producers { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductBasket> ProductBaskets { get; set; } = null!;
        public virtual DbSet<UserProfile> UserProfiles { get; set; } = null!;
        //public IQueryable<Product> COUNT_NAME_TO_PRICELb4(int price) => FromExpression(() => COUNT_NAME_TO_PRICELb4(price));
        //public IQueryable<Product> RETURN_NAMES(int price) => FromExpression(() => RETURN_NAMES(price));

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-6S01LM0\\MSSQLSERVER01;Database=lbnet;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.HasDbFunction(() => COUNT_NAME_TO_PRICELb4(default));
            //modelBuilder.HasDbFunction(() => RETURN_NAMES(default));
            modelBuilder.Entity<MyFunctionResult>().HasNoKey().ToTable("MyFunctionResult", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<Basket>(entity =>
            {
                entity.ToTable("Basket");

                entity.HasIndex(e => e.UserId, "UQ__Basket__1788CC4D627FDCB7")
                    .IsUnique();

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Basket)
                    .HasForeignKey<Basket>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Basket__UserId__2F10007B");
            });

            modelBuilder.Entity<Characteristic>(entity =>
            {
                entity.ToTable("Characteristic");

                entity.Property(e => e.ProcessorName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ScreenDiagonal).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<History>(entity =>
            {
                entity.ToTable("History");

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.HasOne(d => d.Basket)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.BasketId)
                    .HasConstraintName("FK__History__BasketI__35BCFE0A");
            });

            modelBuilder.Entity<Producer>(entity =>
            {
                entity.ToTable("Producer");

                entity.Property(e => e.ProducerName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Decription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhotoUrl)
                    .HasMaxLength(5000)
                    .IsUnicode(false)
                    .HasColumnName("PhotoURL");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Characteristic)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CharacteristicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Product__Charact__2A4B4B5E");

                entity.HasOne(d => d.Producer)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProducerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Product__Produce__2B3F6F97");
            });

            modelBuilder.Entity<ProductBasket>(entity =>
            {
                entity.ToTable("ProductBasket");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Basket)
                    .WithMany(p => p.ProductBaskets)
                    .HasForeignKey(d => d.BasketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductBa__Baske__32E0915F");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductBaskets)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductBa__Produ__31EC6D26");
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserProf__1788CC4C7EF08FBA");

                entity.ToTable("UserProfile");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<LB4.Models.StoredProcedure> StoredProcedure { get; set; }

        public DbSet<LB4.Models.Table> Table { get; set; }
    }
}
