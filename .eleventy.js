const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/glide.theme.min.css');
    eleventyConfig.addPassthroughCopy('./src/glide.core.min.css');
    
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
      });

      eleventyConfig.addCollection("allMyContent", function(collectionApi) {
        return collectionApi.getAll();
      });

      
        // Sort with `Array.sort`
        eleventyConfig.addCollection("myCustomSort", function(collectionApi) {
          return collectionApi.getFilteredByTag("post").sort(function(a, b) {
            //return a.date - b.date; // sort by date - ascending
            return b.sort - a.sort; // sort by date - descending
            //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
            //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
          });
        });
      

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}