
  angular.module('quotes', [])

  .controller('QuoteController', ['$http', '$scope', function($http, $scope) {

    $scope.currentQuoteText = "Look at me now, Dad!";
    $scope.currentQuoteAttribution = "- Pierce Hawthorne";

    $scope.getQuote = function() {
      var req = {
        //    http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&foo=' + Date.now(),
        method: 'GET',
        cache: false
      };

      $http(req).then(function success(res) {
        // process response
        console.log(res.data[0].content);
        var quote = res.data[0];
        // strip CR/LF from the quote content
        var content = quote.content.replace(/(\r\n|\n|\r|<p>|<\/p>)/gm,"");

        $scope.currentQuoteText = content;
        $scope.currentQuoteAttribution = "- " + quote.title;
        $scope.$apply;
      }, function error(res) {
        //do something if the response has an error
        console.log(res);
      });
    };

    $scope.postToTwitter = function() {
      // send json data as param to twitter link
      var baseurl = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
      var fullurl = baseurl + encodeURIComponent('"' + $scope.currentQuoteText + '" ' + $scope.currentQuoteAttribution);
      window.open(fullurl, "_blank");
    };
  }]) // close controller


/*  
  $.ajax( {
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
    success: function(data) {
      var quote = data.shift(); // take the first quote from the results
      // strip CR/LF from the quote content
      var content = quote.content.replace(/(\r\n|\n|\r)/gm,"");
      
      // Fade to black... and back
      $('#attribution').animate({opacity: 0}, 160, function(){
        // I do this callback stuff so that the animation
        //  completes before the text changes and the fade in occurs.
        $('#attribution').html("- " + quote.title);
        currentQuoteAttribution = $("#attribution").text();
        $('#attribution').animate({opacity: 1}, 700);
      });
      $('#quotetext').animate({opacity: 0}, 160, function(){
        $('#quotetext').html(content);
        currentQuoteText = $("#quotetext").text();
        $('#quotetext').animate({opacity: 1}, 700);
      });
      $('.quotebox i').animate({opacity: 0}, 160, function(){
        $('.quotebox i').animate({opacity: 1}, 700);
      });
    },
    cache: false
  });
*/
