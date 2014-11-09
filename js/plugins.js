(function($){


	$(document).ready(function(){

		function generatePDF() {

			var doc = new jsPDF();
			doc.setFont("helvetica");

			var header1 = $('[data-pdf="header-1"]').html();

			doc.setTextColor(100);
			doc.text(20, 20, header1);

			doc.setTextColor(150);
			doc.text(20, 30, 'This is light gray.');

			doc.setTextColor(255,0,0);
			doc.text(20, 40, 'This is red.');

			doc.setTextColor(0,255,0);
			doc.text(20, 50, 'This is green.');

			doc.setTextColor(0,0,255);
			doc.text(20, 60, 'This is blue.');

			doc.save('Test.pdf');

    }

    $(".pdf.button").click(function() {
      generatePDF();
    });

	});

})(window.jQuery);

// non jQuery plugins below

