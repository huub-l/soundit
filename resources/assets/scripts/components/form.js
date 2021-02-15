import api, { checkStatus, parseJSON, errorResponse } from '../utils/api';

export default function form(selector) {
  if( ! document.body.classList.contains('page-template-template-page') ) {
    let form = document.querySelector('[data-form="' + selector + '"]'),
      requiredFields = form.getElementsByClassName('required-field');
      // console.log('works')

    let postURL;
      switch (form.dataset.form) {
        case 'contact-form':
          postURL = api.forms.contact;
          break;
        case 'newsletter':
          postURL = api.forms.newsletter;
          break;
        default:
          break;
      }

      /* Form Helpers */
      function resetMessages() {
          form.querySelectorAll('.form-error').forEach(f => {
          f.classList.remove('show');
          });
      }

      function resetFields() {
          const Inputs = form.querySelectorAll('input:not([type=submit]), select');
          [].forEach.call(Inputs, Input => {
          Input.value = '';
          });
      }

      function validateEmail(email) {
          // eslint-disable-next-line
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
      }

      form.addEventListener('submit', ev => {
      ev.preventDefault();
      if (form.dataset.form != selector) {
      return;
      }

      form.dataset.loading = 'true';

      // reset the form messages
      resetMessages();

      // Validate Everything
      let invalidFields = [];

      let makeInvalid = field => {
        invalidFields.push(field);
        form.querySelector('[data-error="' + field.id + '"]').classList.add('show');
      };

      let validateForm = fields => {
        for (let index = 0; index < fields.length; index++) {
          const required = fields[index];

          if (required.type == 'email') {
            if (!validateEmail(required.value)) {
              makeInvalid(required);
            }
          } else if (
            required.type == 'file' &&
            required.files.length == 0
          ) {
            makeInvalid(required);
          } else {
            if (!required.value) {
              makeInvalid(required);
            }
          }
        }

        if (invalidFields.length > 0) {
          return false;
        }

        return true;
      };

      // Append all present files
      let params = new FormData(form);
      params.append('_wpnonce', document.body.dataset.nonce);
      
      if (validateForm(requiredFields)) {
        fetch(postURL, {
          method: 'POST',
          body: params,
        })
          .then(checkStatus)
          .then(parseJSON)
          .then(response => {
            // console.log(params)
            if (response.code === 'sent-with-success') {
              if (form.dataset.form == 'contact-form') {
                document.querySelector('.contact-form .form-feedback').classList.add('success')
              } else if (form.dataset.form == 'newsletter') {
                document.querySelector('.newsletter .form-feedback').classList.add('success')
              }
              resetFields();
              form.dataset.loading = 'done';
              setTimeout(() => {
                form.dataset.loading = 'false';
                document.querySelector('.form-feedback').classList.remove('success')
              }, 4000);
            }
          })
          .catch(error => {
            console.log('...', error);
            errorResponse(error);
          });
      }
    });
  }
}