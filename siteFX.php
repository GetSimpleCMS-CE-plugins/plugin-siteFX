<?php
// Register the plugin in GetSimple
$thisfile = basename(__FILE__, ".php");

register_plugin(
    $thisfile, // Plugin ID
    'Site FX ✨', // Plugin Name
    '1.0',             // Version
    'risingisland',       // Author
    'https://getsimple-ce.ovh/donate', // Author URL
    'Festivus for the rest of us. Add some special occasion or holiday decor to your site.', // Plugin Description
    'plugins',         // Page type (plugins, themes, or settings)
    'effects_selector_admin_page' // Function to call for the admin page
);

// Add a link to the plugin in the sidebar
add_action('plugins-sidebar', 'createSideMenu', array($thisfile, 'Site FX ✨', 'effects-selector'));

// Function to display the admin page
function effects_selector_admin_page() {
	global $SITEURL;
	echo '
	<link rel="stylesheet" href="'.$SITEURL.'plugins/siteFX/css/w3.css">
	<div class="w3-parent w3-container">';
		
    if ($_POST) {
        // Save the selected effect
        $selected_effect = isset($_POST['effect']) ? $_POST['effect'] : 'none';
        file_put_contents(GSDATAOTHERPATH . 'selected_effect.txt', $selected_effect);

        // Display the success message
        echo '
		<p id="success-message">Effect saved successfully!</p>';
		echo '
		<style>
			#success-message {opacity: 1; transition: opacity 1s ease-in-out;}
			#success-message.fade-out {opacity: 0;}
		</style>';
        echo '
		<script>
			setTimeout(function() {
				var successMessage = document.getElementById("success-message");
				if (successMessage) {
					successMessage.classList.add("fade-out");
					setTimeout(function() {
						successMessage.remove();
					}, 1000); // Wait for the fade-out animation to complete
				}
			}, 3000);
		</script>';
    }

    // Read the currently selected effect
    $selected_effect = file_exists(GSDATAOTHERPATH . 'selected_effect.txt') ? file_get_contents(GSDATAOTHERPATH . 'selected_effect.txt') : 'none';

    // Display the form
    echo '
		<h3>Site FX ✨</h3>
		<p>Festivus for the rest of us. Add some special occasion or holiday decor to your site.</p>
		<hr>

			<div class="w3-container">
				<p>Select the type of bling you would like to add to your page.</p>
				<form method="post" action="">';
				
    $effects = array(
        'none' => 'None',
        'balloons' => 'Balloons 🎈',
        'cherry_blossoms' => 'Cherry Blossoms 🌸',
        'confetti' => 'Confetti 🎊',
        'easter_eggs' => 'Easter Eggs 🥚',
        'falling_leaves' => 'Falling Leaves 🍂',
        'fireworks' => 'Fireworks 🎆',
        'ghosts' => 'Ghosts 👻',
        'hearts' => 'Hearts ❤️',
        'music_festival' => 'Music Festival 🎶',
        'shamrocks' => 'Shamrocks ☘️',
        'snow' => 'Snow 🌨️',
        'snowflakes' => 'Snow 2 ❄️',
        'space' => 'Space 🪐',
    );

    foreach ($effects as $value => $label) {
        $checked = ($selected_effect == $value) ? 'checked' : '';
        echo "<label style='padding:5px 0'><input class='w3-radio' type='radio' name='effect' value='$value' $checked> $label</label><br>";
    }

    echo '
					<br>
					<input class="w3-btn w3-green w3-round w3-margin-bottom" type="submit" value="Save Effect">
				</form>
			<footer class="w3-border-top w3-padding-top-32 margin-bottom-none">
				<div id="donate paypal">
				<a class="w3-button w3-round-xxlarge" style="background:#F44336;color:white;" href="https://getsimple-ce.ovh/donate" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 9h3c0.55 0 1 0.45 1 1v3c0 0.55 -0.45 1 -1 1h-3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path><mask id="lineMdCoffeeLoop0"><path stroke="#fff" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeLoop0)"><animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2"/><animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5"/></rect></g></svg> Buy us a coffee</a>
			</div>
			</footer>
		</div>
	</div>';
}

// Hook into the theme footer
add_action('theme-footer', 'add_effect_script');

function add_effect_script() {
	
    // Read the selected effect
    $selected_effect = file_exists(GSDATAOTHERPATH . 'selected_effect.txt') ? file_get_contents(GSDATAOTHERPATH . 'selected_effect.txt') : 'none';

    // Add the corresponding JavaScript
    switch ($selected_effect) {
        case 'snow':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/snow.js"></script>
			<script>
				christmasOverlaySnow.enable();
			</script>';
            break;
			
        case 'snowflakes':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/snowflakes.js"></script>
			<script>
				new Snowflakes();
			</script>';
            break;
			
        case 'fireworks':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/fireworks.js"></script>
			<script>
				const fireworks = new FireworksOverlay();
				fireworks.startAnimation();
			</script>';
            break;
			
        case 'ghosts':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/ghosts.js"></script>';
            break;
			
        case 'easter_eggs':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/eggs.js"></script>';
            break;
			
        case 'falling_leaves':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/leaves.js"></script>';
            break;
			
        case 'hearts':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/hearts.js"></script>';
            break;
			
        case 'shamrocks':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/shamrocks.js"></script>';
            break;
			
        case 'space':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/space.js"></script>';
            break;
			
        case 'confetti':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/confetti.js"></script>';
            break;
			
        case 'cherry_blossoms':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/cherry_blossoms.js"></script>';
            break;
			
        case 'music_festival':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/music_festival.js"></script>';
            break;
			
        case 'balloons':
            echo '
			<script src="'.$SITEURL.'plugins/siteFX/js/balloons.js"></script>';
            break;
			
        // Add cases for all other effects
        default:
            // No effect selected
            break;
    }
}