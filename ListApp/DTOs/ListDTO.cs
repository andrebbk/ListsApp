namespace ListApp.DTOs
{
    public class ListDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int TypeId { get; set; }
        public required string Type { get; set; }
        public int ItemsCount { get; set; }
    }
}
