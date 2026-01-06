import React from 'react'

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <img src="https://static.wikia.nocookie.net/springfieldbound/images/c/c3/Snake_Jailbird_%28Official_Image%29.png" alt="Imagen de Snake" className="w-64 h-64 mx-auto mt-10"/>

        <h1 className="text-4xl font-bold mt-4 mb-4">Bienvenidos a MercadoPreso</h1>
        <p className="text-lg m-10">
          Bienvenido a MercadoPreso, donde cada artículo tiene una historia dudosa, un origen cuestionable y la aprobación absoluta de Snake: lo tomé prestado indefinidamente, dude.
        </p>
      </div>
    </div>
  )
}

export default Home