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
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
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
	return (
		<div
			{...useBlockProps.save()}
			className={` ${useBlockProps.save().className} ${
				backgroundColorClass && backgroundColorClass
			}`}
			style={{ backgroundColor: backgroundColor }}
		>
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
			</figure>
			<div class="conteneurs-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
