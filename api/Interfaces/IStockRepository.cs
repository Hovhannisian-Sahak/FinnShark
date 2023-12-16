using api.Dtos.Stock;
using api.Models;

namespace api.Interface
{

    public interface IStockRepository
    {
        Task<List<Stock>> GetStocks();
        Task<Stock> GetStock(int id);
        Task<Stock> CreateStock(Stock stockModel);
        Task<Stock> UpdateStock(int id, UpdateStockRequestDto stockModel);
        Task<Stock> DeleteStock(int id);

    }
}