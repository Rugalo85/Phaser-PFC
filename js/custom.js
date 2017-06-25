//HIDE MODAL SCRIPT
$('#myModal').on('hidden.bs.modal', function () {
	$(this).find('form').trigger('reset');
	$('input').popover('hide');
});


//RE-TYPE PASSWORD SCRIPT
function checkPasswordMatch() {
  var password = $("#txtNewPassword").val();
  var confirmPassword = $("#txtConfirmPassword").val();
  var $submitButton = $('#submit-button');

  if (password != confirmPassword) {
      $("#divCheckPasswordMatch").html("<p style='color:red; font-weight:bold;'>Passwords do not match</p>");
      $submitButton.prop('disabled', true);
  } else {
      $("#divCheckPasswordMatch").html("<p style='color:green; font-weight:bold;'>Passwords match</p>");
      $submitButton.prop('disabled', false);
  }
}

$(document).ready(function () {
 	$("#txtConfirmPassword").keyup(checkPasswordMatch);
});


//VALIDATION
$.fn.goValidate = function() {
    var $form = this,
        $inputs = $form.find('input:text');
  
    var validators = {
        name: { regex: /^[A-Za-z]{3,}$/ },
        pass: { regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ },
        email: { regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,}$/ },
        phone: { regex: /^[2-9]\d{2}-\d{3}-\d{4}$/, }
    };

    var validate = function(klass, value) {
        var isValid = true,
            error = '';
            
        if (!value && /required/.test(klass)) {
            error = 'This field is required';
            isValid = false;
        } else {
            klass = klass.split(/\s/);
            $.each(klass, function(i, k){
                if (validators[k]) {
                    if (value && !validators[k].regex.test(value)) {
                        isValid = false;
                        error = validators[k].error;
                    }
                }
            });
        }
        return {
            isValid: isValid,
            error: error
        }
    };

    var showError = function($input) {
        var klass = $input.attr('class'),
            value = $input.val(),
            test = validate(klass, value);
      
        $input.removeClass('invalid');
        $('#form-error').addClass('hide');
        
        if (!test.isValid) {
            $input.addClass('invalid');
            
            if(typeof $input.data("shown") == "undefined" || $input.data("shown") == false){
               $input.popover('show');
            }
        } else {
        $input.popover('hide');
      }
    };
   
    $inputs.keyup(function() {
        showError($(this));
    });
  
    $inputs.on('shown.bs.popover', function () {
      $(this).data("shown",true);
  });
  
    $inputs.on('hidden.bs.popover', function () {
      $(this).data("shown",false);
  });

    $form.submit(function(e) {
        $inputs.each(function() { /* test each input */
          if ($(this).is('.required') || $(this).hasClass('invalid')) {
              showError($(this));
          }
      });
        if ($form.find('input.invalid').length) { /* form is not valid */
          e.preventDefault();
            $('#form-error').toggleClass('hide');
        }
    });
    return this;
};
$('form').goValidate();

//FORM
$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

//ACCORDION
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);

//Get game difficulty
function getDifficulty() {
    //Form value
    gameDifficulty = document.getElementById('difficultySelect').value;
    //Store it in local storage
    localStorage.setItem('gameDifficulty', gameDifficulty);

    if (document.getElementById('customGame') !== null) {
        userLogged = document.getElementById('customGame').value;
        localStorage.setItem('userLogged', userLogged);
    } else {
        userLogged = "guest";
        localStorage.setItem('userLogged', userLogged);
    }

    return true;
}
