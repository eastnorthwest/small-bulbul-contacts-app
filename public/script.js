$(document).ready(function(){

  // initialize modal
  $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { }, // Callback for Modal open. Modal and trigger parameters available.
        complete: function() { } // Callback for Modal close
      }
  );

  // capture delete functions
  $(document).on('click', '.deleteContact', function() {
    console.log('deleteContact', $(this))
    $('#deleteConfirmModal').modal('open')
    $('#deleteConfirmModal').attr('contact_id', $(this).attr('id'));
    $('#deleteContactName').text($(this).attr('name'));
  });

  // confirm delete
  $(document).on('click', '.deleteConfirm', function() {
    Materialize.toast('Contact deleted.');
    setTimeout(() => {
      window.location.href = '/contacts/delete/' + $('#deleteConfirmModal').attr('contact_id');
    }, 500);
  });

  // cancel delete
  $(document).on('click', '.deleteCancel', () => {
    $('#deleteConfirmModal').removeAttr('contact_id');
    $('#deleteConfirmModal').modal('close');
  });

});
