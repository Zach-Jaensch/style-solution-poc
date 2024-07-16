import { Trans } from "@lingui/macro";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import styled from "styled-components";
import { Link } from "../link";

interface SkipToContentProps {
  /**
   * The target component to skip to.
   *
   * Will use an existing ID if one has been set.
   */
  targetRef: RefObject<HTMLElement | null>;
}

export const ERROR_NO_ID_ON_TARGET = "The target element must have an ID set.";

/**
 * A hidden "skip to content" link that allows users to skip directly to the
 * specified content area, bypassing potentially complex navigation.
 */
export function SkipToContent({ targetRef }: SkipToContentProps) {
  const [href, setHref] = useState("");

  useEffect(() => {
    if (!targetRef.current?.id) {
      throw new Error(ERROR_NO_ID_ON_TARGET);
    }

    setHref(targetRef.current.id);
  }, [setHref, targetRef]);

  return (
    <SkipToContentLink component={"a"} href={`#${href}`}>
      <Trans context="skip">Skip to content</Trans>
    </SkipToContentLink>
  );
}

const SkipToContentLink = styled(Link)`
  background: white;
  border: 1px solid currentColor;
  padding: ${(props) => props.theme.space.s4};
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.2s ease-in-out;

  @media (prefers-reduced-motion) {
    transition: none;
  }

  &:focus {
    transform: translateY(0%);
  }
`;
