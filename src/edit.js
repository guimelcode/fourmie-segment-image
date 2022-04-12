/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	Placeholder,
	Button,
	PanelBody,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	__experimentalSpacer as Spacer,
	RangeControl,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	/**
	 * + Reprendre la structure de Segment
	 * + Implémenter la strucutre Image
	 */
	/**
	 * + Permettre l'ajout d'un block Heading dans un block Conteneur
	 * 		+ Mis en seconde rangée à taille variable
	 */
	const {
		attributes: {
			backgroundColorClass,
			backgroundColor,
			imgID,
			imgURL,
			imgAlt,
			imgWidth,
			imgHeight,
			imgHeightLimit,
			imgOffsetVerticalPosition,
		},
		setAttributes,
	} = props;
	const ALLOWED_BLOCKS = ["fourmi-e/conteneur"];
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Gestion de l'image">
					<Spacer>
						<RadioGroup
							label="Hauteur de l'image"
							checked={imgHeightLimit}
							onChange={(value) => {
								setAttributes({
									imgHeightLimit: value,
								});
							}}
						>
							<Radio value="petite">Petite</Radio>
							<Radio value="moyenne">Moyenne</Radio>
							<Radio value="grande">Grande</Radio>
						</RadioGroup>
					</Spacer>
					<Spacer>
						<RangeControl
							label="Décalage dans la hauteur"
							value={imgOffsetVerticalPosition}
							onChange={(value) => {
								setAttributes({ imgOffsetVerticalPosition: value });
							}}
						/>
					</Spacer>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps()}
				className={` ${useBlockProps().className} ${
					backgroundColorClass && backgroundColorClass
				}`}
				style={{ backgroundColor: backgroundColor }}
			>
				{!imgID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(image) => {
								setAttributes({
									imgID: image.id,
									imgURL: image.url,
									imgAlt: image.alt,
									imgWidth: image.width,
									imgHeight: image.height,
								});
							}}
							allowedTypes={["image"]}
							value={imgID}
							render={({ open }) => (
								<Placeholder
									icon="image-alt"
									label={__("Photo", "la-fourmi-e")}
									instructions={__("Selectionner une image", "la-fourmi-e")}
								>
									<Button isSecondary isLarge onClick={open} icon="upload" style={{zIndex: 100}}>
										{__("Importer", "la-fourmi-e")}
									</Button>
								</Placeholder>
							)}
						/>
					</MediaUploadCheck>
				) : (
					<figure class="image-wrap">
						<img
							src={imgURL}
							alt={imgAlt}
							width={imgWidth}
							height={imgHeight}
							className={` hauteur-${imgHeightLimit} `}
							style={{
								objectPosition: `center ${imgOffsetVerticalPosition}%`,
							}}
						/>
						{props.isSelected && (
							<Button
								className="fourmi-e-remove-image"
								onClick={() => {
									setAttributes({
										imgID: null,
										imgURL: null,
										imgAlt: null,
										imgWidth: null,
										imgHeight: null,
									});
								}}
								icon="dimiss"
								style={{
									position: 'absolute',
									zIndex: 100,
									top: 0,
									left: '4%',
									color: 'red'
								}}
							>
								{__("Supprimer l'image", "la-fourmi-e")}
							</Button>
						)}
					</figure>
				)}
				<div class="conteneurs-wrap">
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
				</div>
			</div>
		</Fragment>
	);
}
