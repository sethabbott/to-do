(function (window){
  window.COMPONENTS = window.COMPONENTS || {};
}(window));

COMPONENTS = (function(COMPONENTS,window){

  COMPONENTS.todo = function(el){

    var modules = {

      init: function(){
        var construct = '<div class="list-wrap">'
                  + '<form id="todo-add" method="post">'
                  + '<input type="text" name="item" id="item" placeholder="Item Description">'
                  + '<input type="submit" id="submit" value="Add">'
                  + '<button type="button" class="clear-list">Remove All Items</button>'
                  + '</form>'
                  + '<ul class="list"></ul>'
                  + '</div>';

          $(el).prepend(construct);
          modules.bindEvents();
          modules.items.pullItems();
          modules.listItems();

      }, // end init();


      bindEvents: function(){

        $('#todo-add').on('submit',function(event){

          event.preventDefault();
          modules.addItem();

        });

        $('.list').on('click','.close',function(){
          modules.clearItems($(this).parent().children('span').text());
        });

        $('.list').on('mouseenter','li',function(){
          
            // add close button
            $('<a href="#" class="close fontawesome-remove">x</a>')
            .hide()
            .appendTo($(this))
            .fadeIn();

            $(this).addClass('hover');

        })
        .on('mouseleave','li',function(){

            $(this).children('a').remove();
            $(this).removeClass('hover');

        })

        $('.clear-list').on('click',function(event){
          event.preventDefault();
          modules.clearItems();
          
        })


      }, // end bindEvents()


      addItem: function(){
        //declare variables
        var item = $('#item').val();

       !item ? alert('no item') : modules.items.pushItems(item);  

      },// end addItem();


      clearItems: function(item){

        if (!item) {
          modules.items.array = [];
          localStorage.setItem('storedItems','');
          $('.list').html('');

        } else {

          for (i=0,len=modules.items.array.length;i<len;i++){
            console.log(item);
              if (modules.items.array[i] === item){
                modules.items.array.splice([i]);
              }
          }

        } 

      }, // end clearItems();


      listItems: function(){

        var list = '';

        $('.list').html('');

        for (i=0,len=modules.items.array.length;i<len;i++){
          list += '<li><span>' + modules.items.array[i] + '</span></li>';  
        }

        $('.list').append(list);

      }, // end listItems()

      items: {

        pullItems: function(){
          var storage = JSON.parse(localStorage.getItem('storedItems')) ? JSON.parse(localStorage.getItem('storedItems')): 'no items';
          
          for (i=0,len = storage.length;i<len;i++){
            modules.items.array.push(storage[i]);
          } 
         
        },

        pushItems: function(item){
          modules.items.array.push(item);
          localStorage.setItem('storedItems',JSON.stringify(modules.items.array));
          modules.listItems();
          $('#item').val('').focus();
        },

        array: []
      }
    }// end modules

    modules.init();

    };// end toDo object


    // applies todolist method to dom element
    return COMPONENTS.todo('.container');

})(COMPONENTS,window);