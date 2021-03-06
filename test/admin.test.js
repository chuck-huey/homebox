var Admin = require("../Store/admin");

describe("Admin Object Tests", function() {
  var oscar = new Admin("oscar", "oscar@gmail.com", "passed");

  test("should be an admin object", function() {
    expect(oscar instanceof Admin).toBe(true);
  });

  test("should add a movie", function() {
    oscar.addMovie("Jack Reacher", "Action", 2012);
    expect(oscar.readAllMovies()).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "Jack Reacher" })])
    );
  });

  test("should read movies from database", function() {
    expect(oscar.getMoviefromDB("Jack Reacher")).toMatchObject({ title: "Jack Reacher" });
    expect(oscar.readAllMovies()).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "The Accountant" })])
    );
    expect(oscar.getMoviefromDB("Aquaman")).toBe("Movie not found");
  });

  test("should edit movies", function() {
    expect(oscar.editMovie("Fear", "year", 1996)).toMatchObject({
      title: "Fear",
      year: 1996
    });
    expect(oscar.editMovie("Apocalypto", "year", 2001)).toBe("Movie not found");
    expect(oscar.editMultipleProps("Spiderman", "year", 2001)).toBe("Movie not found");
  });

  test("should delete movie", function() {
    expect(oscar.deleteMovie("Jack Reacher", 2012)).toBe("Movie Deleted");
    expect(oscar.readAllMovies()).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "Jack Reacher" })])
    );
    expect(oscar.readAllMovies().length).toBe(10);
  });
  test("should get a rental", function() {
    expect(oscar.getRental(2)).toEqual(expect.objectContaining({ movies: expect.any(Array) }));
    expect(oscar.getRental(7)).toBe("Rental does not exist");
  });
  test("should get rental history of a customer", function() {
    expect(oscar.getRentalByCustomer(3)).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: expect.any(String) })])
    );
    expect(oscar.getRentalByCustomer(1)).toBe("No rentals by this customer");
  });
  test("should get all rentals", function() {
    expect(oscar.viewRentalsInDB()).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: expect.any(String) })])
    );
  });
  test("should get edit rentals", function() {
    expect(oscar.editRental(2, "status", "closed")).toEqual(
      expect.objectContaining({ status: "closed" })
    );
    expect(oscar.editRental(3, "status", "late")).toBe("Rental not found");
  });
});
