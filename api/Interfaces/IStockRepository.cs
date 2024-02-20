using api.Dtos.Stock;
using api.Helpers;
using api.Models;

namespace api.Interface
{

    public interface IStockRepository
    {
        Task<List<Stock>> GetStocks(QueryObject query);
        Task<Stock> GetStock(int id);
        Task<Stock?> GetStockBySymbol(string symbol);
        Task<Stock> CreateStock(Stock stockModel);
        Task<Stock> UpdateStock(int id, UpdateStockRequestDto stockModel);
        Task<Stock> DeleteStock(int id);
        Task<bool> StockExists(int id);
    }
}