<?php

namespace App\Model;

class Page
{
    public function __construct(
        private string $title,
        private string $path,
        private ?int $menuIndex = null,
    ) {
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function getPath(): string
    {
        return $this->path;
    }

    public function getMenuIndex(): ?int
    {
        return $this->menuIndex;
    }
}
