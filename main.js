(function($) {

  var colors = ['BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'];

  var generateColorTable = function(xresources) {
    $('#xresources').removeClass("error"); 

    var el = $('.output');

    try {
      // background and foreground
      var background = xresources.match(/background\s*:\s*(#[\da-fA-F]{6})/)[1];
      var foreground = xresources.match(/foreground\s*:\s*(#[\da-fA-F]{6})/)[1];

      // set background/foreground of container
      el.css({
        'background-color' : background,
        'color' : foreground
      });

      var out = $(".output .grid");
      out.html('');

      var rows = (new Array('default')).concat(colors);
      //rows
      $.each(rows, function(i, color) {
        var tr = document.createElement("tr");

        $(tr).addClass(color);
        
        //cols
        $.each(colors, function(i, color) {
          var td = document.createElement("td");
          var normal = document.createElement("span");
          var bright = document.createElement("span");

          $(normal).addClass(color).text(color);  
          $(bright).addClass(color).addClass("bright").text(color);  

          $(td).append(normal).append(bright);

          $(tr).append(td);
        });

        out.append(tr);

        //colors

        if(i > 0) {
          var back = xresources.match("color" + (i - 1) + "\\s*:\\s*(#[\\da-fA-F]{6})")[1];
          $(tr).css({'background-color': back});
        }
      });

      // apply colors to text
      $.each(colors, function(i, color) {
        var normal = xresources.match("color" + i + "\\s*:\\s*(#[\\da-fA-F]{6})")[1];
        var bright = xresources.match("color" + (i + 8) + "\\s*:\\s*(#[\\da-fA-F]{6})")[1];

        $("span." + color).css({ 'color' : normal });
        $("span.bright." + color).css({ 'color' : bright });
      });

      var selection = xresources.match(/color7\s*:\s*(#[\da-fA-F]{6})/)[1];
      $('head').append("<style>.output span::selection, .output div::selection { background-color: " + selection + "; }</style>")
    } catch(e) {
      $('#xresources').addClass("error"); 
      throw e;
    }
  };

  var initial = $('#xresources').text();
  generateColorTable(initial); 

  $('#xresources').blur(function(ev) {
    generateColorTable($(this).val());
  });
   
})(jQuery);
