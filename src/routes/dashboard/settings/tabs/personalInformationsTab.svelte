<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	let files: FileList;
</script>

<div style="max-width: 750px;">
	<!-- Base Information Section -->
	<div class="p-2 justify-center items-center">
		<section class="card space-y-4">
			<form class="border border-surface-500 p-4 space-y-4 rounded-container-token">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span>Profilbild</span>
					<FileDropzone
						title="Profilbild hereinziehen oder klicken zum auswählen"
						notes="Datei darf nicht größer als 10MB sein!"
						bind:files
					/>
				</label>
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
