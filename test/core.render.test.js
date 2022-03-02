let libfolder = "../src/jsste";
let JSSTE_Engine = require(libfolder);

function test() {
  describe("render", function () {
    it(" should return Hallo! -> JSON as Page", function () {
      let template = "<[VAR]>!";
      let page = { VAR: "Hallo" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("Hallo!");
    });

    it("should return Hallo! -> String as Page", function () {
      let template = "<[VAR]>!";
      let page = '{"VAR":"Hallo"}';
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("Hallo!");
    });

    it("should retrun one var two times", function () {
      let template = "<[VAR]><[VAR]>!";
      let page = { VAR: "Hallo" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("HalloHallo!");
    });

    it("should retrun EXAMPLE EXAMPLE", function () {
      let template = "<[VAR]> <[VAR]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("EXAMPLE EXAMPLE");
    });

    it("should delete useless var", function () {
      let template = "<[VAR]><[VAR2]><[VAR]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("EXAMPLEEXAMPLE");
    });

    it.skip("blub", function () {
      let result = JSSTE_Engine.render(
        {
          js$test: `out('<h1>'+ Date.now().toString() + '</h1>')`,
          test: "hallo",
          js$test2: `test2`,
          _STYLES_: ["./test/style"],
        },
        `<html>
        <head>
        <title><[test]></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        <[js$test2]>
        </body>
        </html>`
      );
      console.log(result);
    });

    it("should not rendern _VAR_", function () {
      let template = "<[_VAR_]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should not rendern _var_", function () {
      let template = "<[_var_]>";
      let page = { var: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should not rendern _var2_", function () {
      let template = "<[_var2_]>";
      let page = { var2: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should render in href a tag", function () {
      let template = "<a href='<[LINK]>'></a>";
      let page = { LINK: "www.nodejs.com" };
      let result = JSSTE_Engine.render(page, template);

      result.should.equal("<a href='www.nodejs.com'></a>");
    });

    it("should render a tag", function () {
      let template = "<a href='<[LINK]>'><[VAR]></a>";
      let page = { VAR: "EXAMPLE", LINK: "www.nodejs.com" };
      let result = JSSTE_Engine.render(page, template);

      result.should.equal("<a href='www.nodejs.com'>EXAMPLE</a>");
    });
  });
}

module.exports = test;
