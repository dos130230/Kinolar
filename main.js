// let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'
let popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let top_rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
let upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`


	function render_qilgich(arr){
	let list = document.querySelector('.append')
		
		arr.forEach((el)=>{
			let div = document.createElement('div')
			div.className = "movie"
	
			div.innerHTML = `
				        <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="Fast &amp; Furious Presents: Hobbs &amp; Shaw">
		               <div class="movie-info">
		                   <h3>${el.title}</h3>
		                   <span class="orange">${el.vote_average}</span>
		                </div>
		                <span class="date">${el.release_date}</span>
	
			`
			list.append(div)
		})}


async function RenderMovie(API_KEY) {
	let respone = await fetch(API_KEY)
	
	respone = await respone.json()

	console.log(respone.results)

	let sonlar = respone.results


		render_qilgich(sonlar)

}

RenderMovie(upcoming)





function btns_clic(){
	let btns = document.querySelectorAll(".btns")

	console.log(btns)

	btns.forEach((el)=>{
		let list = document.querySelector('.append')
		el.onclick = (even)=>{
			if(el.value=="popular") {list.innerHTML = null;RenderMovie(popular);izlab_top(popular) }
			 if(el.value=="top_rated") {list.innerHTML = null; RenderMovie(top_rated);izlab_top(top_rated)}
			 if(el.value=="upcoming") {list.innerHTML = null; RenderMovie(upcoming);izlab_top(upcoming)}
			console.log(el.value)
		}

	})
}

btns_clic()




async function izlab_top(arg){

	let respone = await fetch(arg)	
	respone = await respone.json()
	 respone= [...respone.results]

	let btn  = document.querySelector(".btn")

	btn.onclick=(event)=>{
		let search = document.querySelector('#search')
		let min = document.querySelector('#min')
		let max = document.querySelector('#max')
		let score = document.querySelector('#score')
		let list = document.querySelector('.append')

		let arr =respone
		if (search.value!='') {
			arr =respone.filter((el)=>el.title.includes(search.value))
			list.innerHTML = null
			render_qilgich(arr)
			
		}

		if (min.value!='' || max.value!='') {

			if (min.value && !max.value){
				arr =arr.filter((el)=>{
					let m = el.release_date.split("-")[0]
					if ((+m)>=(+min.value)) return true
				})

				list.innerHTML = null
				console.log(arr)
				render_qilgich(arr)
			}
			else if (!min.value && max.value){
				arr =arr.filter((el)=>{
					let l = el.release_date.split("-")[0]
					if ((+l)<=(+max.value)) return true
				})

				list.innerHTML = null
				console.log(arr)
				render_qilgich(arr)
			}
			else{
				arr =arr.filter((el)=>{
					let r = el.release_date.split("-")[0]
					if ((+r)<=(+max.value) && (+r)>=(+min.value)) return true
				})

				list.innerHTML = null
				console.log(arr)
				render_qilgich(arr)
			}
			
		}

		if (score.value!='') {
			arr =arr.filter((el)=>el.vote_average>=(score.value))
			list.innerHTML = null
			render_qilgich(arr)
			
		}


	}	
}

// izlab_top(popular)