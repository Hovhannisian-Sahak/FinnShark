using api.Data;
using api.Dtos.Stock;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;

        public StockController(IStockRepository stockRepository)
        {

            _stockRepository = stockRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Stock>>> GetAll()
        {
            var stocks = await _stockRepository.GetStocks();
            var stockDto = stocks.Select(s => s.ToStockDto());
            return Ok(stocks);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock([FromRoute] int id)
        {
            var stock = await _stockRepository.GetStock(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stock = stockDto.ToStockFromCreateDto();
            await _stockRepository.CreateStock(stock);
            return CreatedAtAction(nameof(GetStock), new { id = stock.Id }, stock.ToStockDto());
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update([FromBody] UpdateStockRequestDto stockDto, [FromRoute] int id)
        {
            var stock = await _stockRepository.GetStock(id);
            if (stock == null)
            {
                return NotFound();
            }
            await _stockRepository.UpdateStock(id, stockDto);
            return Ok(stock.ToStockDto());
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var stock = await _stockRepository.DeleteStock(id);
            if (stock == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}