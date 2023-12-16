using api.Interface;
using api.Models;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        public Task<List<Stock>> GetStocks()
        {
            throw new NotImplementedException();
        }
    }
}