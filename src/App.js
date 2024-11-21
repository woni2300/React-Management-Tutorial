import logo from './logo.svg';
import './App.css';
import Customer from './Components/Customer';
import { render } from '@testing-library/react';

const customers =[ 
  {
  'id': '1',
  'image': 'https://dummyimage.com/64/64/1',
  'name': '홍길동',
  'birthDay': '961222',
  'gender': '남',
  'job': '대학생'
  },

  {
    'id': '2',
    'image': 'https://dummyimage.com/64/64/2',
    'name': '홍길동1',
    'birthDay': '961222',
    'gender': '남',
    'job': '대학생'
    },

    {
      'id': '3',
      'image': 'https://dummyimage.com/64/64/3',
      'name': '홍길동2',
      'birthDay': '961222',
      'gender': '남',
      'job': '대학생'
      }
]

function App() {
  
    return (
      <> 
      {
          customers.map((customer) => {
            return (
              <Customer
                key={customer.id}
                id={customer.id}
                name={customer.name}
                image={customer.image}
                birthDay={customer.birthDay}
                gender={customer.gender}
                job={customer.job}
              />
            )
          })
        }
   
      </>
    );
  
 
}

export default App;
