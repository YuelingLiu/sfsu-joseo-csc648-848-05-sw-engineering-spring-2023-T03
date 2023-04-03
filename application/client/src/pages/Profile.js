import React from 'react'

import Cards from '../components/Cards/Cards'

const Profile = () => {
  return (
    <div>
      <body>
        <div class="container-fluid">
          <div class="row extra_margin">

            <div class="col-md-4 col-sm-12 col-xs-12">

              <div class="text-center">
                <h2 align="float-left">Username</h2>
                <img src="user.ico" class="img-rounded" />

              </div>

            </div>

            <div class="col-md-8 col-sm-* col-xs-*">
              <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac purus lacus. Curabitur lobortis iaculis porta. Nullam vel condimentum dolor. Etiam tempor arcu ut urna mattis, at tristique sapien fringilla. Fusce viverra, odio sed efficitur dapibus, turpis orci posuere tellus, sed gravida dui risus at sapien. Duis faucibus non elit et interdum. Nam placerat nunc id massa placerat efficitur. Maecenas ac felis et elit vulputate posuere a non urna. Suspendisse mattis vitae nisl sed scelerisque. Duis eu risus varius, laoreet est nec, maximus dolor.</p>

              <hr />
              <div class>
                <h1> Posts </h1>
                <Cards />
                <Cards />
              </div>
            </div>

          </div>

        </div>



      </body>
    </div>

  )
}

export default Profile