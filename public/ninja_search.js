(function($){ 
  $(function() {
    $('select').each(function(index) {
      // no need for this anymore
      // if ($(this).find("option").size() <= 5) return false;
      
      // if <select> has no id attribute, then give it one based on name attribute
      var id = $(this).attr('id');
      // if (id == null || id.length == 0) {
      if (id == null || id.length == 0 || $('select[id=' + id + ']').size() > 1) {
        var baseid = (id == null || id.length == 0) ? 
          $(this).attr('name').replace(/\[/,'-').replace(/\]/,'') : id;
        id = baseid;
        var uniqueCounter = 0;
        while ($('select[id=' + id + ']').size() > 0) {
          uniqueCounter += 1;
          id = baseid + "-" + uniqueCounter;
        }
        $(this).attr('id', id);
      }
      
      // create the Ninja Search button, with rel attribute referencing corresponding <select id="...">
      if ($('a.ninja_search_activation[rel="' + id + '"]').size() === 0) {
        $('<a class="ninja_search_activation" rel="' + id + '">ninja search</a>')
        .insertAfter($(this))

        // register onclick handler
        .click(function(event) {
          var selectId = $(this).attr('rel');
          var selectField = $('#' + selectId);
          var flexField = $('input#' + selectId + '_flexselect');
          if (flexField.size() == 0) {
            var width = selectField.width();
            selectField.flexselect();
            var flexField = $('input#' + selectId + '_flexselect');
            flexField.width(width)
            .click().val('').focus();
          } else {
            flexField.remove();
            $('#' + selectId + '_flexselect_dropdown').remove();
            selectField.show();
          }
        });
      }
      
      $(this).mousedown(function (e) {
        e.preventDefault();
        id = $(this).attr('id');
          $('#' + id).next('a').click();
      });
      // add keydown handler for select to automatically activate
      $(this).keypress(function (e) {
        var selectId = $(this).attr('id');
        var selectField = $(this);
        var flexField = $('input#' + selectId + '_flexselect');
        if (flexField.size() == 0) {
          var width = selectField.width();
          selectField.flexselect();
          flexField = $('input#' + selectId + '_flexselect');
          flexField.width(width);
        } else {
          flexField.remove();
          $('#' + selectId + '_flexselect_dropdown').remove();
          selectField.show();
        }
        
        str = String.fromCharCode(e.charCode || e.keyCode);
        if (!e.shift) {
          str = str.toLowerCase();
        }

        flexField = $('input#' + selectId + '_flexselect');
        var e = $.Event('focus');
        e.noSelect = true;
        e.noSave = true;
        flexField.click().val(str).trigger(e);
      });
    });
    return false;
  });
})(jQuery); 


