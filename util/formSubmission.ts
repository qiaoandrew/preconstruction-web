import axios from 'axios';

const encode = (data: any) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const submitForm = (name: string, data: any) => {
  try {
    axios.post('/form.html', encode({ 'form-name': name, ...data }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  } catch (error) {
    console.log(error);
  }
};
