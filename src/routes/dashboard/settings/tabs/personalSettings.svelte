<script lang="ts">
	import { type ConicStop, ConicGradient } from '@skeletonlabs/skeleton';

	const stopsVars: ConicStop[] = [
		{ label: 'Dateien (256MB)', color: ['red', 500], start: 0, end: 25 },
		{ label: 'E-Mails (32MB)', color: ['orange', 500], start: 25, end: 57 },
		{ label: 'Frei (512MB)', color: ['green', 500], start: 57, end: 100 }
	];
</script>

<div style="max-width: 750px;">
	<!-- Base Information Section -->
	<div class="p-2 justify-center items-center">
		<section class="card space-y-4">
			<form class="border border-surface-500 p-4 space-y-4 rounded-container-token">
				<h1 class="text-sm sm:text-xl font-bold">Speicherplatz</h1>
				<ConicGradient stops={stopsVars} legend={true} />
				<label>
					<div class="grid sm:grid-flow-col sm:gap-5 gap-1">
						<div>
							<span>Spitzname</span>
							<input type="text" placeholder="Spitzname..." />
						</div>
						<div>
							<span>Geburtstag</span>
							<input type="date" placeholder="Spitzname..." />
						</div>
					</div>
				</label>
				<label>
					<span>Private E-Mail</span>
					<input type="text" class="" placeholder="E-Mail" />
				</label>
			</form>
		</section>
	</div>

	<!-- Address Section -->
	<div class="p-2 justify-center items-center">
		<section class="card space-y-4">
			<form class="border border-surface-500 p-4 space-y-4 rounded-container-token">
				<h1 class="text-sm sm:text-xl font-bold">Adresse</h1>
				<label>
					<span>Strasse</span>
					<input type="text" class="" placeholder="Strasse" />
				</label>
				<label>
					<div class="grid sm:grid-flow-col sm:gap-5 gap-1">
						<div>
							<span>Stadt</span>
							<input type="text" placeholder="Stadt..." />
						</div>
						<div>
							<span>PLZ</span>
							<input type="number" placeholder="PLZ..." />
						</div>
					</div>
				</label>
			</form>
		</section>
	</div>
</div>
