

export default function Results({ product, description, price }) {
	return (
		<>
			<div >
				<div >
					
						<h3 >{product}</h3>
					
					<p >{description}</p>
					<p >{price}</p>
				</div>
			</div>
		</>
	);
}