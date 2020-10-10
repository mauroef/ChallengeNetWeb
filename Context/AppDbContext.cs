using ChallengeNetWeb.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CardTransaction>()
                .HasKey(ct => new { ct.CardId, ct.TransactionId });
        }

        public DbSet<Card> Card { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<CardTransaction> CardTransaction { get; set; }
        public DbSet<Status> State { get; set; }
    }
}
