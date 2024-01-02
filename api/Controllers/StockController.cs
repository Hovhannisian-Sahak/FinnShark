using api.Data;
using api.Dtos.Stock;
using api.Helpers;
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
        public async Task<ActionResult<List<Stock>>> GetAll([FromQuery] QueryObject query)
        {
            var stocks = await _stockRepository.GetStocks(query);
            var stockDto = stocks.Select(s => s.ToStockDto());
            return Ok(stocks);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Stock>> GetStock([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = stockDto.ToStockFromCreateDto();
            await _stockRepository.CreateStock(stock);
            return CreatedAtAction(nameof(GetStock), new { id = stock.Id }, stock.ToStockDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Update([FromBody] UpdateStockRequestDto stockDto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = await _stockRepository.GetStock(id);
            if (stock == null)
            {
                return NotFound();
            }
            await _stockRepository.UpdateStock(id, stockDto);
            return Ok(stock.ToStockDto());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = await _stockRepository.DeleteStock(id);
            if (stock == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}